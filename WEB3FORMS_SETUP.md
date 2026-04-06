# Configurare Web3Forms - Ghid Pas cu Pas

## Pasul 1: Crează Access Key Nou

1. **Mergi la**: https://web3forms.com/
2. **Click pe "Get Started - Free"**
3. **Introdu emailul tău de business**: `contact@thesquarechessclub.com`
4. **Click "Create Access Key"**
5. Web3Forms va trimite un **Access Key** pe ecran și un **email de verificare** la `contact@thesquarechessclub.com`

## Pasul 2: Verifică Emailul

1. **Deschide inbox-ul**: `contact@thesquarechessclub.com`
2. **Caută email de la**: `noreply@web3forms.com`
3. **Subject**: "Verify your email for Web3Forms"
4. **Click pe link-ul de verificare** din email
5. ⚠️ **FOARTE IMPORTANT**: Fără verificare, NU vei primi niciun email!

## Pasul 3: Copiază Noul Access Key

După ce apeși "Create Access Key", vei vedea ceva de genul:
```
Your Access Key: abc123def456ghi789jkl012mno345pq
```

**COPIAZĂ acest Access Key!**

## Pasul 4: Actualizează Codul

Spune-mi noul Access Key și îl voi actualiza în cod automat.

Sau poți face singur/ă:
1. Deschide: `src/components/Contact.tsx`
2. Linia 8: Înlocuiește vechiul key
3. Salvează fișierul

```typescript
const ACCESS_KEY = "NOUL_TAU_ACCESS_KEY_AICI";
```

## Verificare Finală

După ce ai:
✅ Creat access key-ul nou
✅ Verificat emailul (click pe link)
✅ Actualizat codul cu noul key

Testează formularul din nou! Acum ar trebui să primești emailurile.

---

## Troubleshooting

**Nu primesc email de verificare?**
- Verifică folderul Spam/Junk
- Așteaptă 5-10 minute
- Încearcă să creezi access key din nou

**Am verificat dar tot nu primesc emailuri?**
- Verifică dashboard-ul Web3Forms: https://web3forms.com/dashboard
- Asigură-te că emailul este "Verified" (cu checkmark verde)
- Testează cu un email simplu direct pe site-ul lor

**Web3Forms nu funcționează deloc?**
Alternativa 2: Pot configura EmailJS (la fel de gratuit, la fel de simplu)
