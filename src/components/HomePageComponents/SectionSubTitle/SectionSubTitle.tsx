export const SectionSubTitle =({children,style}:{children:any,style?:string})=>{
    return(
        <p className={`text-brand-dark text-base font-normal ${style}`}>
            {children}
        </p>
    )
}