import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'



const Banner: React.FC = () => {

    return (
      <span><span style={{ width: '175px', height: '175px', display: "block", margin: "0 auto" }} id="loading-vid-container" dangerouslySetInnerHTML={{ __html: `
        <video
          style="width: 175px; height: 175px;"
          id="banner-vid"
          loop
          muted
          autoplay
          playsinline
        ><source src="https://i.imgur.com/EeFeEeY.mp4" type="video/mp4"/></video>
      ` }}></span>
      <p style={{color:"#fff", textAlign:"center"}}>Transaction pending... Please wait</p>

      </span>
    )
  
}

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName} Tokens`} />
      {pendingTx ?
        <Banner/>
        : null
      }
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button text="Close" variant="secondary" onClick={onDismiss}/>
        <Button
          disabled={(pendingTx || !val)}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
