import Image from 'next/image'
const Home = async () => {


  return (
    <main className={'container'}>

      <h1>Главная страница</h1>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus asperiores consectetur quod laborum aliquam pariatur perspiciatis velit reiciendis suscipit corporis rem voluptatibus nihil, nam a quidem error architecto. Possimus, ea?
      <section>
        <div className="post shadow">
          <div className="postTitle">Title</div>
          <div className="postDate">11/12/02</div>
          <div className="postContent">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel sint libero, ipsa tenetur.</div>
          <div className="postUserName">Adam</div>
          <Image src="vercel.svg" width={500} height={250} alt='Picture' />
        </div>
      </section>
    </main>
  )
}

export default Home