export const SectionTitle = ({children,style}:{children:any,style?:string})=>{
    return(
        <h3 className={`text-brand-dark text-[40px] font-normal font-serif ${style}`}>
            {children}
        </h3>
    )
}