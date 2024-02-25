import { UserContestInfo, UserHeatMap, UserRecentSubmission, UserSolvedProblemsStats } from '.'
import  UserProfileDetails from './components/userProfileDetails/UserProfileDetails'

function App() {
  return (
    <div className='bg-black w-screen min-h-screen p-10 flex flex-col justify-center items-center gap-2'>
      <div className='flex gap-2'>
        <div className='flex gap-2'>
            <div className='w-[320px] self-stretch flex items-center'>
                <UserProfileDetails userName="sudhanva_nadiger__" />
            </div>
            <div className='flex flex-col h-full items-center justify-center gap-2'>
                <div className='flex-1 w-full'>
                    <UserSolvedProblemsStats userName="sudhanva_nadiger__" />
                </div>
                <div className='w-full flex-1'>
                    <UserContestInfo userName="sudhanva_nadiger__" />
                </div>
            </div>
        </div>
        </div>
        <div className='w-[800px] flex flex-col gap-2'>
            <UserHeatMap userName="sudhanva_nadiger__" />
            <UserRecentSubmission userName="sudhanva_nadiger__" />
        </div>

    </div>
  )
}

export default App
