import {type ReactNode, forwardRef, useCallback, memo } from "react";

import leetcodeQuery from "../../utils/leetcodeQuery"
import { MatchedUser } from "../../types"
import { useFetch } from "../../hooks";
import MiscellaneousDetai from "./MiscellaneousDetai";
import { getPath } from "../../utils";

import { TiLocationOutline } from "react-icons/ti";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import LoadingOrError from "../LoadingOrError";

type Props = {
    userName: string;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    }
    className?: string;
    asLink?: boolean;
    loadingComponent?: ReactNode
    showRank?: boolean;
    hideLocation?: boolean;
    hideSchool?: boolean;
    hideWebsite?: boolean;
    hideSkills?: boolean;
    hideCompany?: boolean;
}

const UserProfileDetails = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    showRank = true,
    hideLocation = false,
    hideSchool = false,
    hideWebsite = false,
    hideCompany = false,
    hideSkills = false,
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserProfile(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch<MatchedUser>(fetchData);

    if(isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }

    const {userAvatar, realName, ranking, countryName, company, school, skillTags, websites} = data.profile;
    const { githubUrl, linkedinUrl, twitterUrl } = data;

    return (
        <div id="user_profile_detail_container" ref={ref} className="shadow-md flex flex-col rounded-2xl w-[320px] bg-stone-700 text-cyan-400 items-start p-4">
            <div id="user_main_content" className="flex justify-center gap-4">
                <img
                    id="user_avatar"
                    src={userAvatar}
                    alt={`${userName}'s avatar`}
                    className="w-20 h-20 rounded-md"
                />
                <div
                    id="user_name_and_rank_container"
                    className="flex flex-col items-start"
                >
                    <p id="user_real_name" className="text-xl font-semibold">
                        {realName}
                    </p>
                    <p id="user_name" className="text-sm text-gray-300">
                        {userName}
                    </p>

                    {showRank && (
                        <div id="rank_details" className="flex gap-2 text-sm mt-auto">
                            <p id="rank_label" className="text-gray-300">Rank :</p>
                            <p id="rank_value" className="font-semibold">{ranking}</p>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-sm font-semibold my-3 text-start text-gray-300">{data.profile.aboutMe}</p>

            <div 
                id="user_misc_details"
                className="overflow-hidden w-full text-ellipsis"
            >
               {company && !hideCompany && (
                    <MiscellaneousDetai
                        id="user_company"
                        icon={<MdOutlineWorkOutline />}
                        title={company}
                     />
               )} 
               {countryName && !hideLocation && (
                    <MiscellaneousDetai
                        id="user_location"
                        icon={<TiLocationOutline />}
                        title={countryName}
                     />
               )} 
               {school && !hideSchool && (
                    <MiscellaneousDetai
                        id="user_school"
                        icon={<IoSchoolOutline />}
                        title={school}
                     />
               )} 
               {websites && !hideWebsite && (
                    <MiscellaneousDetai
                        id="user_website"
                        icon={<SlGlobe />}
                        title={websites[0]}
                        link={websites[0]}
                     />
               )} 
               {githubUrl && (
                    <MiscellaneousDetai
                        id="user_github"
                        icon={<FaGithub />}
                        title={getPath(githubUrl)}
                        link={githubUrl}
                     />
               )} 
               {linkedinUrl && (
                    <MiscellaneousDetai
                        id="user_linkedin"
                        icon={<FaLinkedinIn />}
                        title={getPath(linkedinUrl)}
                        link={linkedinUrl}
                     />
               )} 
               {twitterUrl && (
                    <MiscellaneousDetai
                        id="user_twitter"
                        icon={<FaXTwitter />}
                        title={getPath(twitterUrl)}
                        link={twitterUrl}
                     />
               )} 
               {skillTags && !hideSkills && (
                    <MiscellaneousDetai
                        id="user_twitter"
                        icon={<FiTag className="-rotate-90" />}
                        title={skillTags.join(', ')}
                     />
               )} 
                
            </div>
        </div>
    )
})

const MemoComponent = memo(UserProfileDetails)

export default MemoComponent;