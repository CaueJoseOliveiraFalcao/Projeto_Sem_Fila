'use client'
import Headerb from "../components/Headerb"
export default function authLayout({
    children,
} : {
    children : React.ReactNode

}) {
    return(
        <div >
            <Headerb/>
            {children}
        </div>
    )
}