import {type ReactNode, forwardRef, useCallback, memo } from "react";
import '../../index.css';
import leetcodeQuery from "../../utils/leetcodeQuery"
import { MatchedUser } from "../../types"
import { useFetch } from "../../hooks";
import MiscellaneousDetail from "./MiscellaneousDetail";
import { getPath } from "../../utils";

import { TiLocationOutline } from "react-icons/ti";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import LoadingOrError from "../LoadingOrError";

export type Props = {
    userName: string;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    }
    loadingComponent?: ReactNode
    showRank?: boolean;
    hideLocation?: boolean;
    hideSchool?: boolean;
    hideWebsite?: boolean;
    hideSkills?: boolean;
    hideCompany?: boolean;
}


/**
 * Component for displaying user profile details fetched from LeetCode.
 * @param {object} props - The props object.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component's root element.
 * @param {string} props.userName - The username of the user.
 * @param {object} [props.theme] - An object containing custom theme colors.
 * @param {string} [props.theme.primaryColor] - The primary color.
 * @param {string} [props.theme.secondaryColor] - The secondary color.
 * @param {string} [props.theme.bgColor] - The background color.
 * @param {React.ReactNode} [props.loadingComponent] - Custom loading component to be displayed.
 * @param {boolean} [props.showRank=true] - Flag indicating whether to show the user's rank.
 * @param {boolean} [props.hideLocation=false] - Flag indicating whether to hide the user's location.
 * @param {boolean} [props.hideSchool=false] - Flag indicating whether to hide the user's school.
 * @param {boolean} [props.hideWebsite=false] - Flag indicating whether to hide the user's website.
 * @param {boolean} [props.hideCompany=false] - Flag indicating whether to hide the user's company.
 * @param {boolean} [props.hideSkills=false] - Flag indicating whether to hide the user's skills.
 * @returns The JSX element representing the user profile details.
 */
const UserProfileDetails = forwardRef<HTMLDivElement, Props>(({
    userName,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
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
        <div style={{
            background: theme.bgColor,
            color: theme.secondaryColor
        }} id="user_profile_detail_container" ref={ref} className="w-full shadow-md flex flex-col rounded-2xl items-start p-4">
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
                    <p style={{
                        color: theme.primaryColor
                    }} id="user_real_name" className="text-xl font-semibold">
                        {realName}
                    </p>
                    <p id="user_name" className="text-sm">
                        {userName}
                    </p>

                    {showRank && (
                        <div id="rank_details" className="flex gap-2 text-sm mt-auto">
                            <p style={{
                                color: theme.secondaryColor
                            }} id="rank_label">Rank :</p>
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
                    <MiscellaneousDetail
                        id="user_company"
                        icon={<MdOutlineWorkOutline />}
                        title={company}
                     />
               )} 
               {countryName && !hideLocation && (
                    <MiscellaneousDetail
                        id="user_location"
                        icon={<TiLocationOutline />}
                        title={countryName}
                     />
               )} 
               {school && !hideSchool && (
                    <MiscellaneousDetail
                        id="user_school"
                        icon={<IoSchoolOutline />}
                        title={school}
                     />
               )} 
               {websites && !hideWebsite && (
                    <MiscellaneousDetail
                        id="user_website"
                        icon={<SlGlobe />}
                        title={websites[0]}
                        link={websites[0]}
                     />
               )} 
               {githubUrl && (
                    <MiscellaneousDetail
                        id="user_github"
                        icon={<FaGithub />}
                        title={getPath(githubUrl)}
                        link={githubUrl}
                     />
               )} 
               {linkedinUrl && (
                    <MiscellaneousDetail
                        id="user_linkedin"
                        icon={<FaLinkedinIn />}
                        title={getPath(linkedinUrl)}
                        link={linkedinUrl}
                     />
               )} 
               {twitterUrl && (
                    <MiscellaneousDetail
                        id="user_twitter"
                        icon={<FaXTwitter />}
                        title={getPath(twitterUrl)}
                        link={twitterUrl}
                     />
               )} 
               {skillTags && !hideSkills && (
                    <MiscellaneousDetail
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