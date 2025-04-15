import Mainapplayout from "../components/layouts/mainapplayout"

export default function Layout ({children} : {
    children : React.ReactNode;
}) {
    return <Mainapplayout>
        {children}
        </Mainapplayout>
}