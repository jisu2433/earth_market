import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { imageUploadsHandler } from "../../util/imageUploads";
import { createProduct } from "../../actions/productActions";
import {
  Form,
  MainFieldSet,
  ProductFormWrapper,
  SubTitle,
  Label,
  UploadBtn,
} from "./index.style";

const ProductUploadForm = () => {
  const [productImage, setProductImage] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const noString = event => {
    const { value } = event.target;
    return value.replace(/[^0-9]/g, "");
  };
  const addComma = event => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    const { value } = event.target;
    return value.toString().replace(regexp, ",");
  };

  const dispatch = useDispatch();

  const previewImage = e => {
    const nowSelectImageList = e.target.files;

    const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);

    setProductImage(nowImageUrl);
  };

  const onSubmit = async data => {
    try {
      const { itemName, link, itemImage } = data;
      //가격 전처리
      const str = await getValues("price");
      setValue("price", parseInt(str.replace(/[^0-9]/g, ""), 10));
      const price = getValues("price");
      //이미지 전처리
      const image = await imageUploadsHandler(itemImage[0]);

      dispatch(createProduct(itemName, price, link, image));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <MainFieldSet>
        <SubTitle>이미지 업로드</SubTitle>
        <ProductFormWrapper>
          <Label onChange={previewImage} htmlFor="itemImage">
            <img
              src={productImage}
              onError={event => (event.target.style.display = "none")}
              onLoad={event => (event.target.style.display = "inline-block")}
              alt="상품 사진"
            />
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="itemImage"
              id="itemImage"
              className="ir"
              {...register("itemImage", { required: true })}
            ></input>
          </Label>
        </ProductFormWrapper>
        <ProductFormWrapper>
          <label>상품명</label>
          <input
            name="itemName"
            type="text"
            placeholder="2~10자 이내여야 합니다."
            autoComplete="off"
            spellCheck="false"
            {...register("itemName", {
              required: true,
              minLength: 2,
              maxLength: 10,
            })}
          />
          {errors.itemName?.type === "minLength" && (
            <p>*2~10자 이내여야 합니다.</p>
          )}
          {errors.itemName?.type === "maxLength" && (
            <p>*2~10자 이내여야 합니다.</p>
          )}
          <label>가격</label>
          <input
            name="price"
            type="text"
            placeholder="숫자만 입력 가능합니다."
            autoComplete="off"
            spellCheck="false"
            {...register("price", {
              required: true,
              onChange: e => {
                setValue("price", noString(e));
              },
              onBlur: e => {
                setValue("price", addComma(e));
              },
            })}
          />
          {errors.price?.type === "pattern" && <p>*숫자만 입력 가능합니다.</p>}
          <label>판매 링크</label>
          <input
            name="link"
            type="text"
            placeholder="URL을 입력해 주세요."
            autoComplete="off"
            spellCheck="false"
            {...register("link", {
              required: true,
              pattern:
                /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
            })}
          />
          {errors.link && errors.link.type === "pattern" && (
            <p>* URL을 입력해 주세요.</p>
          )}
        </ProductFormWrapper>
        <UploadBtn type="submit" disabled={!isValid}>
          저장
        </UploadBtn>
      </MainFieldSet>
    </Form>
  );
};

export default ProductUploadForm;
