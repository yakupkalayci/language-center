import { ReactNode } from 'react'

function Container({ children, extraClass }: { children: ReactNode, extraClass?: string }) {
    return (
        <div className={`max-w-screen-xl mx-auto ${extraClass || ""}`}>
            {children}
        </div>
    )
}

export default Container;