import appBgImg from '../assets/app-bg.png'
import appPreviewImg from '../assets/mobile.png'
import Image from 'next/image'
import logoImage from '../assets/logo.svg'
import userAvatars from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import { api } from '../services/api'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: string
  guessCount: string
  userCount: string
}


export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, o código do bolão foi copiado para a área de transferência')
      setPoolTitle('')
    }
    catch (e) {
      console.log(e)
      alert('Erro ao criar o bolão, tente novamente')
    }
  }

  return (
    <>
      <div className='max-w-6xl h-screen   mx-auto flex flex-row items-center gap-28'>
        <main>
          <Image src={logoImage} alt='nlw copa' />
          <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe com os amigos!</h1>
          <div className='gap-2 mt-10 flex items-center'>
            <Image
              className='w-1/4'
              src={userAvatars}
              alt="Avatares dos usuários que estão participando" />
            <strong className='text-offWhite-100 text-xl'>
              <span className='text-ignite-500'>+{userCount}</span> pessoas já estão utilizando
            </strong>
          </div>
          <form
            onSubmit={createPool}
            className='mt-10 flex gap-2'
          >
            <input
              className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-offWhite-100'
              type="text"
              placeholder='Qual o nome do seu bolão?'
              required
              onChange={(event) => setPoolTitle(event.target.value)}
              value={poolTitle}
            />
            <button
              className='bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-400'
              type="submit">Criar meu bolão</button>
          </form>
          <p className='text-gray-300 mt-4 leading-relaxed'>
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

          <div className='border-t pt-10 border-gray-600 mt-10 flex justify-between items-center text-offWhite-100'>

            <div className='flex items-center gap-6'>
              <Image src={iconCheck} alt="ícone checar" />
              <div className='flex flex-col'>
                <span className='font-bold text-2xl'>+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <div className='h-14 bg-gray-600 w-px' />
            <div className='flex items-center gap-6'>
              <Image src={iconCheck} alt="ícone checar" />
              <div className='flex flex-col'>
                <span className='font-bold text-2xl'>+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>
        <Image src={appPreviewImg} alt="Preview da aplicação mobile" />
      </div>
    </>

  )
}


export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])


  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count

    }
  }
}