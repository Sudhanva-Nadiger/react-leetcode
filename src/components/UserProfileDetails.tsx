import leetcodeQuery from "../utils/leetcodeQuery"
import { MatchedUser } from "../types"
import { useFetch } from "../hooks";
import { useCallback } from "react";

type Props = {
    userName: string;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    }
    className?: string;
    asLink?: boolean;
}

function UserProfileDetails({
    userName
}: Props) {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserProfile(userName);
    }, [userName])

    const { data } = useFetch<MatchedUser>(fetchData);

  return (
    <div className="text-black">{JSON.stringify(data, null, 2)}</div>
  )
}

export default UserProfileDetails