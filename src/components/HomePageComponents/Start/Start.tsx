export const Start = () => {
    return (
        <section id={'use-cases'}
            style={{ backgroundImage: "url('/img/CTA-bg.png')" }}
            className="relative bg-brand-dark bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-32 px-4 sm:px-8 overflow-hidden border-t border-white/10"
        >
            <div className="relative z-10 container mx-auto max-w-3xl flex flex-col items-start md:items-center text-left md:text-center">

                <img
                    src="/icons/logo.svg"
                    width={36}
                    height={36}
                    alt="Certifd"
                    className="mb-6"
                />

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight drop-shadow-md">
                    Start issuing trusted <br className="hidden md:block" /> digital credentials today.
                </h2>

                <p className="font-sans text-[15px] sm:text-lg md:text-xl text-brand-white/50 mb-8 md:mb-10 max-w-2xl">
                    Join forward-thinking universities already using Certifd to issue,
                    revoke, and verify credentials at a fraction of the cost.
                </p>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3 sm:gap-4 mb-8 md:mb-10">
                    <button
                        className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 cursor-pointer px-6 sm:px-[34px] py-[14px] text-brand-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap  font-medium"
                    >
                        Start Issuing Credentials
                        <img src="/icons/arrow.svg" alt=""/>
                    </button>
                    <button
                        className="w-full sm:w-auto bg-transparent hover:bg-white/10 cursor-pointer text-brand-white/90 hover:text-brand-white border border-white/20 hover:border-white/50 px-6 sm:px-[63px] py-[14px] transition-colors flex items-center justify-center  font-medium"
                    >
                        Login
                    </button>
                </div>

                <p className="text-xs sm:text-sm text-brand-white/40 leading-relaxed">
                    No credit card required <span className="hidden sm:inline">·</span><br className="sm:hidden" />
                    {' '}Free 30-day trial <span className="hidden sm:inline">·</span><br className="sm:hidden" />
                    {' '}GDPR compliant
                </p>

            </div>
        </section>
    );
};