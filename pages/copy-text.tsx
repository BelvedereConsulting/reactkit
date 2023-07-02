import type { NextPage } from "next"
import { DemoPage } from "components/DemoPage"
import { CopyText } from "lib/ui/CopyText"

const CopyTextPage: NextPage = () => {
  return (
    <DemoPage title="Copy Text">
      <CopyText content="https://increaser.org">Increaser URL</CopyText>
    </DemoPage>
  )
}

export default CopyTextPage