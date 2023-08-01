"use client";

import { useRouter } from "next/navigation"
import { CustomButton } from "."


import { ShowMoreProps } from "@/types"
import { updateSearchParams } from "@/utils"

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 12

    const newPathname = updateSearchParams("limit", `${newLimit}`)

    router.push(newPathname);
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore