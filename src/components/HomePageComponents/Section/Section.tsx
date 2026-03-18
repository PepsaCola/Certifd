export const Section=({children, style,bTop,bg}:{children:any,style?:string,bTop?:boolean,bg?:string})=>{
    return(
        <section className={`${bTop&&'border-t'} border-brand-section-border ${bg}`}>
            <div className={`max-w-[1080px] mx-auto py-[128px] px-[80px] border-x border-brand-section-border flex flex-col ${style} `}>
                {children}
            </div>
        </section>
    )
}