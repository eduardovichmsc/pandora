import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Suspense } from "react";
import SiteUp from "../components/ui/SiteUp/SiteUp";

export default function Layout() {
   return(
      <>
         <Header />
         
         <Outlet />

         <SiteUp scrollHeight={300} />

         <Footer />
      </>
   )
}