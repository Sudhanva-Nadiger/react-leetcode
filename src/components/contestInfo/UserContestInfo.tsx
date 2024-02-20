import { forwardRef, useCallback, useMemo, useState } from 'react';
import { useFetch } from '../../hooks';
import { type UserContestInfo as TUserContestInfo } from '../../types';
import leetcodeQuery from '../../utils/leetcodeQuery';
import ContestGraph from './ContestGraph';
import { getCordinates } from '../../utils';
import ContestStaticData from './ContestStaticData';
import LoadingOrError from '../LoadingOrError';
import DynamicContestData from './DynamicContestData';

type Props = {
  userName: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    bgColor?: string;
  }
}

const UserContestInfo = forwardRef<HTMLDivElement, Props>(({
  userName,
  theme = {
    primaryColor: "rgba(34,211,238,1)",
    secondaryColor: "rgba(209,213,219,1)",
    bgColor: "rgba(68,64,60,1)"
},
}: Props, ref) => {

  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchData = useCallback(() => {
    return leetcodeQuery.fetchUserContestDetails(userName);
  }, [userName]);

  const { data, loading: isLoading, error } = useFetch<TUserContestInfo>(fetchData);

  const { userContestRankingHistory: history, userContestRanking } = data || {};

  const points = useMemo(() => {
    if(!history) return []
    return getCordinates(history);
  }, [history]);

  if (!data || isLoading || error) return (
    <LoadingOrError error={error} loading={isLoading} />
  );

  return (
    <div 
      id="user_contest_info_container" 
      ref={ref} 
      className='sm:w-[500px] w-full p-4 rounded-lg' 
      style={{background:theme.bgColor}}
    >
      {activeIndex === -1 ? (
        <ContestStaticData contestData={userContestRanking!} />
        ) : (
          <DynamicContestData contestData={data.userContestRankingHistory[activeIndex]} />
        )}
      <ContestGraph
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        data={points}
      />
    </div>
  )
})

export default UserContestInfo;