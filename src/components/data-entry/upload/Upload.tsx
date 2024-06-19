import { DragEvent, forwardRef, useRef, useState } from 'react';
import { ButtonEx } from '@components';
import icDelete from '@icons/ic_search_delete.svg';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { IUploadProps } from './Upload.types';
import {
  TFormatAll,
  TUploadFileFormat,
  uploadClasses,
  uploadFileFormat,
} from './UploadClasses';

const formatAll: TFormatAll[] = [
  uploadFileFormat.image,
  uploadFileFormat.video,
  uploadFileFormat.audio,
  uploadFileFormat.application,
];

export const Upload = forwardRef<HTMLInputElement, IUploadProps>((args, ref) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const {
    children,
    className,
    htmlForId,
    filePath,
    fileSize,
    fileFormat,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    width,
    height = 2,
    multiple = false,
    usePreviewNameList = false,
    usePreview = false,
    useCustomOnChange = true,
    useCustomOnDrag = true,
    previewClassName = 'bc-upload-preview',
    isError,
    useResetOnUpload = false,
    callback,
    errCallback,
    typeErrCallback,
    sizeErrCallback,
    onChange,
    ...uploadProps
  } = args;
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const FILE_SIZE = fileSize;
  const SUPPORTED_FORMATS = fileFormat;

  const rootClassName = classNames(
    uploadClasses.root,
    {
      // disabled
      [uploadClasses.disabled]: args.disabled,

      // error
      [uploadClasses.isError]: isError,

      // shape
      [uploadClasses.shape.button]: args.shape === 'button',
      [uploadClasses.shape.area]: args.shape === 'area',
      [uploadClasses.shape.drag]: args.shape === 'drag',
    },
    className,
  );

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (const i of e.target.files) {
        if (
          !SUPPORTED_FORMATS.includes(i?.type as TUploadFileFormat) &&
          !SUPPORTED_FORMATS.some(
            (arrFormat) => i.type?.split('/')[0] === arrFormat.replace('/*', ''),
          )
        ) {
          e.target.files = null;
          e.target.value = '';

          console.log('@file type err');

          errCallback && errCallback(e);
          typeErrCallback && typeErrCallback();
          return;
        } else if (i.size > FILE_SIZE) {
          e.target.files = null;
          e.target.value = '';

          console.log('@file size err');

          errCallback && errCallback(e);
          sizeErrCallback && sizeErrCallback();
          return;
        }
      }

      const targetFiles = Array.from(e.target.files);
      if (useResetOnUpload) {
        setFiles(targetFiles);
      } else {
        setFiles([...files, ...targetFiles]);
      }

      // Use FileReader to read file content
      const tempImagUrlArr: string[] = [];

      targetFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
          callback(file);
          console.log('@file', file);
          console.log('E', e);

          const img = new Image();
          if (e.target?.result && typeof e.target?.result === 'string') {
            img.src = e.target?.result;
          }

          img.onload = () => {
            const width = img.width;
            const height = img.height;
            console.log('@w:', width, '@h:', height);
          };

          tempImagUrlArr.push(URL.createObjectURL(file));

          // if (useResetOnUpload) {
          //   setImageUrl([URL.createObjectURL(file)]);
          // } else {
          //   console.log('@image?', imageUrl, URL.createObjectURL(file));
          //   setImageUrl([...imageUrl].concat(tempImagUrlArr));
          // }
          if (useResetOnUpload) {
            setImageUrl(tempImagUrlArr);
          } else {
            setImageUrl([...imageUrl].concat(tempImagUrlArr));
          }
        };

        reader.onerror = () => errCallback && errCallback();

        reader.readAsDataURL(file);

        return reader;
      });

      e.currentTarget.value = '';
    }
    return;
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      for (const i of e.dataTransfer.files) {
        if (
          !SUPPORTED_FORMATS.includes(i?.type as TUploadFileFormat) &&
          !SUPPORTED_FORMATS.some(
            (arrFormat) => i.type?.split('/')[0] === arrFormat.replace('/*', ''),
          )
        ) {
          errCallback && errCallback();
          typeErrCallback && typeErrCallback();
          return;
        } else if (i.size > FILE_SIZE) {
          errCallback && errCallback();
          sizeErrCallback();
          return;
        }
      }
    }
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (useResetOnUpload) {
      setFiles(droppedFiles);
    } else {
      setFiles([...files, ...droppedFiles]);
    }

    const tempImagUrlArr: string[] = [];

    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        callback(file);

        // if (useResetOnUpload) {
        //   setImageUrl([URL.createObjectURL(file)]);
        // } else {
        //   setImageUrl([...imageUrl, URL.createObjectURL(file)]);
        // }
        if (useResetOnUpload) {
          setImageUrl(tempImagUrlArr);
        } else {
          setImageUrl([...imageUrl].concat(tempImagUrlArr));
        }
      };

      reader.onerror = () => errCallback && errCallback();

      reader.readAsDataURL(file);

      return reader;
    });
  };

  const handleDeleteFile = (name: string, lastModified: number, index: number) => {
    if (files) {
      setFiles((files) => files.filter((file, i) => i !== index));
      setImageUrl((files) => files.filter((file, i) => i !== index));
    }
  };

  const acceptFormat = fileFormat.toString();

  return (
    <>
      <label
        className={rootClassName}
        htmlFor={htmlForId}
        style={{ height: `${height}rem`, width: `${width}rem` }}
        onDragOver={
          args.shape === 'drag' && !useCustomOnDrag ? handleDragOver : undefined
        }
        onDragLeave={
          args.shape === 'drag' && !useCustomOnDrag ? handleDragLeave : undefined
        }
        onDrop={args.shape === 'drag' && !useCustomOnDrag ? handleDrop : undefined}
      >
        <span className={uploadClasses.prefix.icon}>
          {args.shape === 'button' ? prefixIcon : null}
        </span>
        <span className={uploadClasses.prefix.text}>
          {args.shape === 'button' ? prefixText : null}
        </span>
        <input
          type="file"
          id={htmlForId}
          accept={acceptFormat}
          onChange={(e) => {
            !useCustomOnChange && handleChangeFile(e);
            onChange && onChange(e);
          }}
          style={{ display: 'none' }}
          autoComplete="off"
          multiple={multiple}
          {...uploadProps}
        />
        <div className={uploadClasses.suffix.wrapper}>
          <p className={uploadClasses.suffix.icon}>
            {args.shape !== 'button' ? suffixIcon : null}
          </p>
          <p className={uploadClasses.suffix.text}>
            {args.shape !== 'button' ? suffixText : null}
          </p>
        </div>
      </label>
      {usePreview ? (
        <div className={previewClassName}>
          {usePreviewNameList && files
            ? files?.map((file, i) => (
                <div
                  className="file-list"
                  key={`${file.name}-${file.lastModified}-${uuidv4()}`}
                >
                  <div>
                    <p className="name">{file.name}</p>
                    <p className="size">{(file.size / 1024).toFixed(2)}KB</p>
                  </div>
                  <ButtonEx
                    type="text"
                    onClick={() => handleDeleteFile(file.name, file.lastModified, i)}
                  >
                    <img src={icDelete} alt="expand-icon" />
                  </ButtonEx>
                </div>
              ))
            : null}
          {usePreview
            ? imageUrl?.map((image, i) => <img src={image} alt="uploadImage" key={i} />)
            : null}
        </div>
      ) : null}
    </>
  );
});
