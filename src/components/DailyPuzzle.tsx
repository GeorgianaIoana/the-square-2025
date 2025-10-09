import React, { useEffect, useRef } from "react";
import { Chessground } from "@lichess-org/chessground";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import "./custom-green-board.css";
import { Chess } from "chess.js";

const DailyPuzzle: React.FC = () => {
  const chessRef = useRef<Chess>(null);
  const groundRef = useRef<any>(null);
  const solutionMovesRef = useRef<string[]>([]);
  const currentSolutionIndexRef = useRef(0);

  useEffect(() => {
    // Wait for DOM to be ready
    const initChessground = () => {
      // Determine which board element to use based on screen size
      const isDesktop = window.innerWidth >= 768; // md breakpoint
      const boardElement = isDesktop
        ? document.getElementById("board-desktop")
        : document.getElementById("board-mobile");

      if (!boardElement) {
        // Retry after a short delay if element not found
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

      function showWinOverlay() {
        const allSquares: string[] = [];
        for (let file of "abcdefgh") {
          for (let rank = 1; rank <= 8; rank++) {
            allSquares.push(file + rank);
          }
        }
        ground.setShapes(
          allSquares.map((sq) => ({
            orig: sq as any,
            brush: "green",
            opacity: 0.3,
          }))
        );
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
                    showWinOverlay();
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
                          showWinOverlay();
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

      // Fetch puzzle
      fetch("https://lichess.org/api/puzzle/daily")
        .then((res) => res.json())
        .then((data) => {
          const pgn = data.game.pgn;
          const initialPly = data.puzzle.initialPly;
          solutionMovesRef.current = data.puzzle.solution;
          currentSolutionIndexRef.current = 0;

          chess.loadPgn(pgn);
          const allMoves = chess.history();
          chess.reset();

          for (let i = 0; i <= initialPly; i++) {
            chess.move(allMoves[i]);
          }

          ground.set({ orientation: chess.turn() === "w" ? "white" : "black" });
          updateBoardState();
        })
        .catch((err) => {
          console.error("Error loading puzzle:", err);
        });
    };

    // Initialize Chessground
    initChessground();

    return () => {
      if (groundRef.current) {
        groundRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-16 bg-[#001a00] border-[#233d36] border-t-[1px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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

          {/* Chess Board - Mobile/Tablet */}
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

          {/* Chess Board - Desktop */}
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
        </div>
      </div>
    </section>
  );
};

export default DailyPuzzle;
