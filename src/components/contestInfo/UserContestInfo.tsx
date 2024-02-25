import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { useFetch } from '../../hooks';
import { type UserContestInfo as TUserContestInfo } from '../../types';
import leetcodeQuery from '../../utils/leetcodeQuery';
import ContestGraph from './ContestGraph';
import { getCordinates } from '../../utils';
import ContestStaticData from './ContestStaticData';
import LoadingOrError from '../LoadingOrError';
import DynamicContestData from './DynamicContestData';
import '../../index.css';
export type Props = {
  userName: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    bgColor?: string;
  },
  loadingComponent?: JSX.Element;
}

/**
 * Component for displaying user's contest information.
 * 
 * Props for the UserContestInfo component.
 * @property {string} userName - The username of the user.
 * @property {object} [theme] - The theme configuration.
 * @property {string} [theme.primaryColor="rgba(34,211,238,1)"] - The primary color.
 * @property {string} [theme.secondaryColor="rgba(209,213,219,1)"] - The secondary color.
 * @property {string} [theme.bgColor="rgba(68,64,60,1)"] - The background color.

 * @param {Props} props - The props object.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component's root element.
 * @returns {JSX.Element} - The JSX element representing the UserContestInfo component.
 */
const UserContestInfo = forwardRef<HTMLDivElement, Props>(({
  userName,
  theme = {
    primaryColor: "rgba(34,211,238,1)",
    secondaryColor: "rgba(209,213,219,1)",
    bgColor: "rgba(68,64,60,1)"
  },
  loadingComponent
}: Props, ref) => {

  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchData = useCallback(() => {
    return leetcodeQuery.fetchUserContestDetails(userName);
  }, [userName]);

  const { data, loading: isLoading, error } = useFetch<TUserContestInfo>(fetchData);

  const { userContestRankingHistory: history, userContestRanking } = data || {};

  const points = useMemo(() => {
    if (!history) return []
    return getCordinates(history);
  }, [history]);

  if (!data || isLoading || error) return (
    <LoadingOrError error={error} loading={isLoading} loadingComponent={loadingComponent} />
  );

  return (
    <div
      id="user_contest_info_container"
      ref={ref}
      className='w-full p-4 rounded-lg h-full'
      style={{ background: theme.bgColor }}
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

const MemoizedUserContestInfo = memo(UserContestInfo);

export default MemoizedUserContestInfo;