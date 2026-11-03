"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X, ArrowsOut } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { aboutPageContent } from "@/data/portfolio";

export default function PhotoArchive() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const images = aboutPageContent.archive;
  const image = images[active];
  const previous = () =>
    setActive((index) => (index - 1 + images.length) % images.length);
  const next = () => setActive((index) => (index + 1) % images.length);
  useEffect(() => {
    const element = dialog.current;
    const unlock = () => {
      document.body.style.overflow = "";
    };
    element?.addEventListener("close", unlock);
    return () => {
      element?.removeEventListener("close", unlock);
      unlock();
    };
  }, []);
  return (
    <>
      <div className="archive-grid">
        {images.slice(1).map((photo, index) => (
          <figure key={photo.src}>
            <button
              type="button"
              aria-label={`View ${photo.alt}`}
              onClick={() => {
                setActive(index + 1);
                dialog.current?.showModal();
                document.body.style.overflow = "hidden";
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 600px) 85vw, 340px"
              />
              <span className="photo-expand">
                <ArrowsOut size={18} />
              </span>
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        data-lenis-prevent
        className="photo-dialog"
        aria-label="Personal archive"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previous();
          if (event.key === "ArrowRight") next();
        }}
      >
        <div className="photo-viewer">
          <button
            type="button"
            className="photo-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close photo"
            title="Close photo"
          >
            <X size={22} />
          </button>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="90vw"
          />
          <div className="photo-caption">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous photo"
              title="Previous photo"
            >
              <ArrowLeft size={20} />
            </button>
            <p>
              {image.caption}
              <span>
                {active + 1} / {images.length}
              </span>
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              title="Next photo"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
