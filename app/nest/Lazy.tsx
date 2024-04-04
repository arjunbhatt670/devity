"use client"

import React, { lazy, Suspense } from "react"
import { ButtonProps } from "components/Button/Button"
import styles from "./style.module.css"

const Button = lazy<(props: ButtonProps) => JSX.Element>(
  /* webpackChunkName: "lazyyyyyyy" */ () => {
    return new Promise((res) => {
      import("components/Button/Button").then((v) => {
        setTimeout(() => {
          res({
            default: v.Button,
          })
        }, 3000)
      })
    })
  }
)

export default function Lazy() {
  return (
    <>
      <Suspense
        fallback={(() => {
          console.log("in the fallback")
          return <p>Loading</p>
        })()}
      >
        Lazy Content
        <div className={styles.div}>div in lazy</div>
        <Button href="">Lazy Button</Button>
      </Suspense>
    </>
  )
}
