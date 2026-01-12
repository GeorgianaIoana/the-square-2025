import React, { useEffect, useRef, useState } from "react";
import { Chessground } from "@lichess-org/chessground";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import "./custom-green-board.css";
import { Chess } from "chess.js";

const PUZZLE_STORAGE_KEY = "the-square-daily-puzzle";
const PUZZLE_CACHE_DURATION_MS = 1000 * 60 * 60 * 12; // 12 hours
const SUCCESS_MESSAGE =
  "Felicitări! Ești pe drumul cel bun! Tocmai ai obținut o lecție gratuită la cursul nostru online. Te rog să ne trimiți poza cu acest mesaj pe WhatsApp sau pe mail. Mult succes la antrenament!";
const SUCCESS_STATE_STORAGE_KEY = "the-square-daily-puzzle-success";
const SUCCESS_DURATION_MS = 60 * 60 * 1000; // 1 hour

type PuzzleSuccessState = {
  puzzleId: string;
  expiresAt: number;
};

type LichessPuzzleResponse = {
  puzzle: {
    id: string;
    initialPly: number;
    solution: string[];
  };
  game: {
    pgn: string;
  };
};

const readCachedPuzzle = (): LichessPuzzleResponse | null => {
  if (typeof window === "undefined") return null;
  const rawValue = window.sessionStorage.getItem(PUZZLE_STORAGE_KEY);
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as {
      storedAt: number;
      puzzle: LichessPuzzleResponse;
    };

    if (!parsed?.puzzle) return null;
    const isExpired =
      Date.now() - parsed.storedAt > PUZZLE_CACHE_DURATION_MS ||
      !parsed.puzzle.puzzle?.id;

    if (isExpired) {
      window.sessionStorage.removeItem(PUZZLE_STORAGE_KEY);
      return null;
    }

    return parsed.puzzle;
  } catch (error) {
    console.warn("Failed to read cached puzzle", error);
    window.sessionStorage.removeItem(PUZZLE_STORAGE_KEY);
    return null;
  }
};

const storeCachedPuzzle = (data: LichessPuzzleResponse) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      PUZZLE_STORAGE_KEY,
      JSON.stringify({ storedAt: Date.now(), puzzle: data })
    );
  } catch (error) {
    console.warn("Failed to cache puzzle", error);
  }
};

const readStoredSuccessState = (): PuzzleSuccessState | null => {
  if (typeof window === "undefined") return null;
  const rawValue = window.sessionStorage.getItem(SUCCESS_STATE_STORAGE_KEY);
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as PuzzleSuccessState;
    if (
      !parsed ||
      typeof parsed.puzzleId !== "string" ||
      typeof parsed.expiresAt !== "number"
    ) {
      window.sessionStorage.removeItem(SUCCESS_STATE_STORAGE_KEY);
      return null;
    }
    if (Date.now() >= parsed.expiresAt) {
      window.sessionStorage.removeItem(SUCCESS_STATE_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn("Failed to read success state", error);
    window.sessionStorage.removeItem(SUCCESS_STATE_STORAGE_KEY);
    return null;
  }
};

const storeSuccessState = (state: PuzzleSuccessState) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      SUCCESS_STATE_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn("Failed to persist success state", error);
  }
};

const clearStoredSuccessState = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SUCCESS_STATE_STORAGE_KEY);
};

const DailyPuzzle: React.FC = () => {
  const chessRef = useRef<Chess | null>(null);
  const groundRef = useRef<any>(null);
  const solutionMovesRef = useRef<string[]>([]);
  const currentSolutionIndexRef = useRef(0);
  const initializedRef = useRef(false);
  const puzzleIdRef = useRef<string | null>(null);
  const successStateAppliedRef = useRef(false);
  const [isSolved, setIsSolved] = useState(false);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const initChessground = () => {
      const isDesktop = window.innerWidth >= 768;
      const boardElement = isDesktop
        ? document.getElementById("board-desktop")
        : document.getElementById("board-mobile");

      if (!boardElement) {
        setTimeout(initChessground, 100);
        return;
      }

      const chess = new Chess();
      chessRef.current = chess;

      const ground = Chessground(boardElement, {
        coordinates: true,
        orientation: "white",
      });
      groundRef.current = ground;

      function computeLegalDests(chessInstance: any) {
        const dests = new Map();
        const squares = [
          "a8",
          "b8",
          "c8",
          "d8",
          "e8",
          "f8",
          "g8",
          "h8",
          "a7",
          "b7",
          "c7",
          "d7",
          "e7",
          "f7",
          "g7",
          "h7",
          "a6",
          "b6",
          "c6",
          "d6",
          "e6",
          "f6",
          "g6",
          "h6",
          "a5",
          "b5",
          "c5",
          "d5",
          "e5",
          "f5",
          "g5",
          "h5",
          "a4",
          "b4",
          "c4",
          "d4",
          "e4",
          "f4",
          "g4",
          "h4",
          "a3",
          "b3",
          "c3",
          "d3",
          "e3",
          "f3",
          "g3",
          "h3",
          "a2",
          "b2",
          "c2",
          "d2",
          "e2",
          "f2",
          "g2",
          "h2",
          "a1",
          "b1",
          "c1",
          "d1",
          "e1",
          "f1",
          "g1",
          "h1",
        ];
        squares.forEach((sq) => {
          const moves = chessInstance.moves({ square: sq, verbose: true });
          if (moves.length)
            dests.set(
              sq,
              moves.map((m: any) => m.to)
            );
        });
        return dests;
      }

      const lockBoard = () => {
        ground.set({
          movable: {
            free: false,
            color: undefined,
            dests: new Map(),
            events: {},
          },
          draggable: {
            enabled: false,
          },
        });
      };

      const scheduleSuccessReset = (durationMs: number) => {
        if (successTimeoutRef.current) {
          window.clearTimeout(successTimeoutRef.current);
        }
        successTimeoutRef.current = window.setTimeout(() => {
          setIsSolved(false);
          successStateAppliedRef.current = false;
          successTimeoutRef.current = null;
          clearStoredSuccessState();
          updateBoardState();
        }, durationMs);
      };

      const restoreSuccessStateIfNeeded = () => {
        if (successStateAppliedRef.current) return;
        const stored = readStoredSuccessState();
        if (!stored) return;
        if (puzzleIdRef.current !== stored.puzzleId) {
          clearStoredSuccessState();
          return;
        }
        const remaining = stored.expiresAt - Date.now();
        if (remaining <= 0) {
          clearStoredSuccessState();
          return;
        }
        lockBoard();
        setIsSolved(true);
        successStateAppliedRef.current = true;
        scheduleSuccessReset(remaining);
      };

      function showSuccessMessage() {
        lockBoard();
        setIsSolved(true);
        successStateAppliedRef.current = true;

        const puzzleId = puzzleIdRef.current;
        if (puzzleId) {
          storeSuccessState({
            puzzleId,
            expiresAt: Date.now() + SUCCESS_DURATION_MS,
          });
        }

        scheduleSuccessReset(SUCCESS_DURATION_MS);
      }

      function updateBoardState() {
        const currentBoardElement =
          window.innerWidth >= 768
            ? document.getElementById("board-desktop")
            : document.getElementById("board-mobile");

        if (!currentBoardElement) return;

        ground.set({
          fen: chess.fen(),
          turnColor: chess.turn() === "w" ? "white" : "black",
          movable: {
            free: false,
            color: chess.turn() === "w" ? "white" : "black",
            dests: computeLegalDests(chess),
            events: {
              after: (from: string, to: string) => {
                const attemptedMove = from + to;
                const expectedMove =
                  solutionMovesRef.current[currentSolutionIndexRef.current];

                if (!expectedMove) return;

                const expectedFrom = expectedMove.slice(0, 2);
                const expectedTo = expectedMove.slice(2, 4);
                const expectedPromotion =
                  expectedMove.length === 5 ? expectedMove[4] : "q";

                if (attemptedMove === expectedFrom + expectedTo) {
                  const move = chess.move({
                    from,
                    to,
                    promotion: expectedPromotion,
                  });
                  currentSolutionIndexRef.current++;

                  if (
                    currentSolutionIndexRef.current >=
                    solutionMovesRef.current.length
                  ) {
                    showSuccessMessage();
                    return;
                  }

                  updateBoardState();

                  const autoMove =
                    solutionMovesRef.current[currentSolutionIndexRef.current];
                  if (autoMove) {
                    setTimeout(() => {
                      const autoFrom = autoMove.slice(0, 2);
                      const autoTo = autoMove.slice(2, 4);
                      const autoPromotion =
                        autoMove.length === 5 ? autoMove[4] : "q";
                      const reply = chess.move({
                        from: autoFrom,
                        to: autoTo,
                        promotion: autoPromotion,
                      });

                      if (reply) {
                        currentSolutionIndexRef.current++;

                        if (
                        currentSolutionIndexRef.current >=
                          solutionMovesRef.current.length
                      ) {
                        showSuccessMessage();
                        return;
                      }

                      updateBoardState();
                      }
                    }, 600);
                  }
                } else {
                  ground.setShapes([
                    { brush: "red", orig: from as any, dest: to as any },
                  ]);
                  setTimeout(() => ground.setShapes([]), 600);
                  updateBoardState();
                }
              },
            },
          },
        });
      }

      const applyPuzzleData = (puzzleData: LichessPuzzleResponse) => {
        const { puzzle, game } = puzzleData;
        const { initialPly, solution } = puzzle;
        const { pgn } = game;

        puzzleIdRef.current = puzzle.id;
        successStateAppliedRef.current = false;
        setIsSolved(false);
        if (successTimeoutRef.current) {
          window.clearTimeout(successTimeoutRef.current);
          successTimeoutRef.current = null;
        }

        solutionMovesRef.current = [...solution];
        currentSolutionIndexRef.current = 0;

        chess.loadPgn(pgn);
        const allMoves = chess.history();
        chess.reset();

        for (let i = 0; i <= initialPly; i++) {
          const move = allMoves[i];
          if (move) {
            chess.move(move);
          }
        }

        ground.set({ orientation: chess.turn() === "w" ? "white" : "black" });
        updateBoardState();
        restoreSuccessStateIfNeeded();
      };

      const fetchPuzzle = async () => {
        try {
          const response = await fetch("https://lichess.org/api/puzzle/daily");
          if (!response.ok) {
            throw new Error(`Failed to fetch puzzle: ${response.status}`);
          }
          const payload = await response.json();
          const puzzleData: LichessPuzzleResponse = {
            puzzle: {
              id: payload.puzzle.id,
              initialPly: payload.puzzle.initialPly,
              solution: payload.puzzle.solution,
            },
            game: {
              pgn: payload.game.pgn,
            },
          };
          storeCachedPuzzle(puzzleData);
          applyPuzzleData(puzzleData);
        } catch (err) {
          console.error("Error loading puzzle:", err);
        }
      };

      const cachedPuzzle = readCachedPuzzle();
      if (cachedPuzzle) {
        applyPuzzleData(cachedPuzzle);
      } else {
        fetchPuzzle();
      }
    };

    initChessground();

    return () => {
      if (groundRef.current) {
        groundRef.current.destroy();
      }
      initializedRef.current = false;
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
      setIsSolved(false);
    };
  }, []);

  return (
    <section className="py-8 md:py-16 bg-[#001a00] border-[#233d36] border-t-[1px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#b8d9d4] font-archivo">
              Puzzle-ul tău zilnic
            </h2>
            <p className="text-[#b8d9d4] text-sm sm:text-base md:text-lg font-archivo mt-2">
              Este la mutare culoarea din dreptul tău. Mult succes!
            </p>{" "}
            <p className="text-[#b8d9d4] text-sm sm:text-base md:text-lg font-archivo mt-2">
              Dacă răspunsul nu este corect, mutarea ta se va retrage.
            </p>
            <p className="text-[#b8d9d4] text-sm sm:text-base md:text-lg font-archivo mt-2">
              Dacă mutarea este corectă, exercițiul va continua cu mutarea
              adversarului.
            </p>
          </div>

          <div className="bg-[#233d36] rounded-lg shadow-2xl border border-[#233d36] p-3 sm:p-4 mb-4 md:hidden">
            <div className="bg-[#233d36] rounded-lg p-3 sm:p-4 mb-4 flex justify-center">
              <div
                id="board-mobile"
                style={{
                  width: "280px",
                  height: "280px",
                  maxWidth: "100%",
                }}
                className="mx-auto rounded-lg overflow-hidden sm:w-[320px] sm:h-[320px]"
              />
            </div>
          </div>

          <div className="hidden md:block bg-[#233d36] rounded-lg shadow-2xl border border-[#233d36] p-6 mb-6">
            <div className="bg-[#233d36] rounded-lg p-6 mb-6 flex justify-center">
              <div
                id="board-desktop"
                style={{
                  width: "500px",
                  height: "500px",
                  maxWidth: "100%",
                }}
                className="mx-auto rounded-lg overflow-hidden"
              />
            </div>
          </div>

          {isSolved && (
            <div className="bg-[#233d36] border border-[#badad5]/30 rounded-xl shadow-lg p-6 sm:p-8 text-center space-y-4">
              <p className="text-[#b8d9d4] text-sm sm:text-base md:text-lg font-archivo leading-relaxed">
                {SUCCESS_MESSAGE}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-archivo">
                <a
                  href="https://wa.me/40742898793?text=Bună!%20Am%20rezolvat%20puzzle-ul%20zilnic%20și%20trimit%20dovada%20pentru%20lecția%20gratuită."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#badad5] text-[#233d36] font-semibold transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#badad5]"
                >
                  <span>Trimite mesaj pe WhatsApp</span>
                </a>
                <a
                  href="mailto:contact@thesquarechessclub.com?subject=Puzzle%20zilnic%20rezolvat&body=Bună!%20Am%20rezolvat%20puzzle-ul%20zilnic%20și%20trimit%20dovada%20pentru%20lecția%20gratuită."
                  className="text-[#badad5] text-sm sm:text-base md:text-lg underline-offset-4 hover:underline"
                >
                  contact@thesquarechessclub.com
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyPuzzle;
