import {Section} from "@/components/HomePageComponents/Section/Section";
import {Steps} from "@/components/HomePageComponents/Steps/Steps";
import {Cases} from "@/components/HomePageComponents/Cases/Cases";

export const BigSection =()=>{
    return (
        <Section style={'!px-0 !pb-0 '} bTop={true}>
            <Steps/>
            <Cases/>
        </Section>
    )
}