import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'
import { html } from '@codemirror/lang-html'
import { atomone } from '@uiw/codemirror-theme-atomone'
import CodeMirror from '@uiw/react-codemirror'
import { useState } from 'react'

const App = () => {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')

  const challenge =
    'Escreva um código HTML que retorne um título h1 com o texto "Olá mundo!".'
  const solution = '<h1>Olá mundo!</h1>'

  const handleCheckResult = () => {
    if (code.includes(solution)) {
      setResult('Parabéns! Você acertou!')
    } else {
      setResult('Ops! Tente novamente.')
    }
  }

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <h1 className="text-3xl font-bold">Bem-vindo(a) ao DEVZ</h1>

        <UserButton showName />

        <div className="mt-10" />

        <div className="mb-4">{challenge}</div>

        <CodeMirror
          value={code}
          onChange={(value) => {
            setResult('')
            setCode(value)
          }}
          extensions={[html()]}
          theme={atomone}
          height="185px" // 1 line = 18.5px
        />

        <iframe
          id="sandbox"
          srcDoc={code}
          sandbox="" // research and correctly implement sandbox attribute for safety
        />

        <button onClick={handleCheckResult}>Testar resposta</button>

        <div>{result}</div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export default App
