/**
 * Modal that shows results, including canvas with senator image background overlayed
 * with results and social share options.
 */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal"
import React, { useEffect } from "react"
import { SenatorData } from "../lib/loadData"
import { useDisclosure } from "@nextui-org/react"
import Image from "next/image"

export type ResultsModalProps = {
  show: boolean
  score: number
  correct: number
  topSenator: SenatorData
}

export default function ResultsModal({
  show,
  score,
  correct,
  topSenator,
}: ResultsModalProps) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

  // Open state controlled by parent
  useEffect(() => {
    if (show) onOpen()
    else onClose()
  }, [show, onOpen, onClose])

  return (
    <Modal backdrop="blur">
      <ModalContent>
        <ModalBody className="text-center">
          <h3>Great job!</h3>
          <h4>
            You scored {score} points and guessed {correct} senators right.
          </h4>
          <h4>
            Your top scoring senator is {topSenator.first_name}{" "}
            {topSenator.last_name}.
          </h4>
          <Image src={topSenator.image_url} alt={topSenator.first_name}></Image>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
