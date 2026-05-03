import { context, useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react";
import { Sprite, SpriteMaterial, Vector3 } from "three";

type Options = {
  label: string,
  position: Vector3,
};

export const useLabel = ({ label, position }: Options) => {
  const { scene } = useThree();
  const canvas = useMemo(() => {
    const el = document.getElementsByTagName('canvas');

    if (el.length) {
      return el[0];
    }

    return null;
  }, []);

  useEffect(() => {
    const padding = 8;
    const fontSize = 18;
    const borderThickness = 2;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      ctx.font = 'robato';
      const metrics = ctx.measureText(label);
      const textHeight = 18 * 1.2;

      const canvasWidth = metrics.width + padding * 2 + borderThickness * 2;
      const canvasHeight = textHeight + padding * 2 + borderThickness * 2;

      const material = new SpriteMaterial({
        transparent: true,
        alphaTest: 0.1,
        depthTest: true,
        depthWrite: false,
      });

      const sprite = new Sprite(material);
      sprite.position.copy(position);
      scene.add(sprite);
    }
  }, [canvas, label, position])

  
}