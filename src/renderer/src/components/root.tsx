import { Outlet } from 'react-router'
import TrialGuard from './trial-guard'

export default function Root(): React.JSX.Element {
  return (
    <TrialGuard>
      <Outlet />
    </TrialGuard>
  )
}
