import * as THREE from 'three'
import { useThree } from 'react-three-fiber'

const minValueBound = 10_000
const maxValueBound = 20_000_000_000
const minValueMultiplier = 1
const maxValueMultiplier = 10

export const scaleValue = (value: number): number => {
  const normalized = THREE.MathUtils.clamp(value, minValueBound, maxValueBound)
  return THREE.MathUtils.mapLinear(normalized, minValueBound, maxValueBound, minValueMultiplier, maxValueMultiplier)
}

export const useMinViewportSize = () => {
  const { size: { height, width } } = useThree()

  const minSize = Math.min(height, width)

  return minSize
}