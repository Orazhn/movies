import Premium from '../components/Premium'
import Cards from '../components/Cards'
import Header from '../components/Header'
export default function HomePage() {

  return (
    <>
        <Header/>
        <Premium/>
        <Cards isShort = {true}/>
    </>
  )
}
