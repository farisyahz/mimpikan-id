import Nav from "./Nav";

const Layout = ({children}) => {
  return(
    <div className="font-inter ">
      <Nav/>
      <main className="max-w-6xl md:mx-auto mx-3 sm:mt-24 mt-28">
        {children}
      </main>
    </div>
  )
}

export default Layout;