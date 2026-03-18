export const Start = () => {
    return (
        <section style={{ backgroundImage: "url('/img/CTA-bg.png')" }} className="relative bg-brand-dark bg-cover bg-center bg-no-repeat py-24 md:py-32 px-4 overflow-hidden border-t border-white/10">

            <div className="relative z-10 container mx-auto max-w-3xl flex flex-col items-center text-center">

                <img src="/icons/logo.svg" width={36} height={36} alt="" className={'self-start mb-[22px]'}/>

                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl  text-white mb-6 leading-tight drop-shadow-md">
                    Start issuing trusted <br className="hidden md:block" /> digital credentials today.
                </h2>

                <p className="font-sans text-lg md:text-xl text-brand-white/50 mb-10 max-w-2xl">
                    Join forward-thinking universities already using Certifd to issue,
                    revoke, and verify credentials at a fraction of the cost.
                </p>

                <div className="flex flex-col sm:flex-row w-full max-w-lg gap-3 mb-6">
                    <button
                        className="bg-brand-accent hover:bg-brand-accent/90 cursor-pointer px-[34px] py-[14px] text-brand-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        Start Issuing Credentials
                        <img src="/icons/arrow.svg" alt=""/>
                    </button>
                    <button
                        className="bg-transparent hover:bg-brand-white/10 cursor-pointer text-brand-white/80 hover:text-brand-white border border-white/20 hover:border-white/70 px-[63px] py-[14px] transition-colors flex items-center justify-center"
                    >
                        Login
                    </button>
                </div>

                <p className="text-sm text-brand-white/30">
                    No credit card required · Free 30-day trial · GDPR compliant
                </p>

            </div>
        </section>
    );
};