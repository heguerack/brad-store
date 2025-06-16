import Image from 'next/image'

export default function loadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}>
      <Image src={'/loader.gif'} alt='Loading...' height={150} width={150} />
    </div>
  )
}
