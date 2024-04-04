// import { call, put, takeEvery } from "redux-saga/effects";
// import {
//   CATEGORIES_REQUEST,
//   fetchCategoriesSuccess,
//   fetchCategoriesFailure,
//   fetchSingleProductFailure,
//   fetchSingleProductSuccess,
// } from "../actions/CategoryActions";
// import {
//   FETCH_SINGLE_PRODUCT_REQUEST,
//   GET_BANNER_DATA,
//   GET_FILTER_DATA,
//   GET_LATESTPRODUCTS_DATA,
//   GET_POSTERS_DATA,
//   GET_PRODUCTS,
//   GET_FILTERED_PRODUCTS,
//   SET_FILTER_DATA,
//   SET_LATESTPRODUCTS_DATA,
//   SET_POSTERS_DATA,
//   GET_REVIEW_DATA,
//   SET_REVIEW_DATA,
//   SET_REVIEW_PERMISSION,
//   GET_REVIEW_PERMISSION,
// } from "../constant/constants";
// import { BaseUrl, EndPoints } from "../../utils/Api";
// import axios from "axios";

// ///////////////////Function For Main Category API ////////////////

// function* fetchCategories() {
//   try {
//     const response = yield call(
//       axios.get,
//       `${BaseUrl}${EndPoints.main_category}`
//     );

//     const categories = response?.data?.data;
//     yield put(fetchCategoriesSuccess(categories));
//   } catch (error) {
//     console.error("fetchCategories - API Error", error.message);
//     yield put(fetchCategoriesFailure(error?.message));
//   }
// }

// /////////////////// Function For PRODUCTS API ////////////////
// function* fetchProducts({ id, setIsLoading, pageFlag, page, limit }) {
//   try {
//     if (id) {
//       const response = yield call(
//         axios.get,
//         pageFlag
//           ? `${BaseUrl}${EndPoints.product_by_category}${id}?page=${page}&limit=${limit}`
//           : `${BaseUrl}${EndPoints.product_by_category}${id}`
//       );
//       if (response.data.status) {
//         window.scrollTo({
//           top: 0,
//           behavior: "instant",
//         });
//         const productResponse = response.data;
//         yield put({
//           type: "PRODUCT_SUCCESS",
//           payload: productResponse,
//         });

//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }
//     }
//   } catch (error) {
//     console.error("Something Went Wrong !", error.status);
//     setIsLoading(false);
//   }
// }

// /////////////////// Function For PRODUCTS API ////////////////
// function* fetchProductsByFilters({
//   id,
//   setIsLoading,
//   pageFlag,
//   page,
//   limit,
//   filterData,
// }) {
//   let body = JSON.stringify(filterData);
//   try {
//     if (id) {
//       const response = yield call(
//         axios.post,
//         pageFlag
//           ? `${BaseUrl}${EndPoints.filtered_products_of_category}${id}`
//           : `${BaseUrl}${EndPoints.filtered_products_of_category}${id}`,
//         { body }
//       );
//       if (response.data.status) {
//         window.scrollTo({
//           top: 0,
//           behavior: "instant",
//         });
//         const productResponse = response.data;

//         yield put({
//           type: "PRODUCT_SUCCESS",
//           payload: productResponse,
//         });

//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }
//     }
//   } catch (error) {
//     console.error("Something Went Wrong !", error.status);
//     setIsLoading(false);
//   }
// }

// /////////////////// Function For PRODUCTS API ////////////////
// function* fetchBanners() {
//   try {
//     const response = yield call(axios.get, `${BaseUrl}${EndPoints.banner}`);
//     const bannerResponse = response?.data?.data;

//     yield put({ type: "SET_BANNER_DATA", payload: bannerResponse });
//   } catch (error) {
//     console.error("Something Went Wrong !!", error);
//   }
// }

// /////////////////// Function For POSTERS API ////////////////
// function* fetchPosters() {
//   try {
//     const response = yield call(axios.get, `${BaseUrl}${EndPoints.posters}`);
//     const postersResponse = response?.data?.data;

//     if (response?.status) {
//       yield put({ type: SET_POSTERS_DATA, payload: postersResponse });
//     } else {
//       // console.log("error in fetchPosters", response?.message);
//     }
//   } catch (error) {
//     console.error("Something Went Wrong !!", error);
//   }
// }

// function* fetchLatestProducts() {
//   try {
//     const response = yield call(
//       axios.get,
//       `${BaseUrl}${EndPoints.latest_products}`
//     );
//     const latestProductsResponse = response?.data?.data;

//     yield put({
//       type: SET_LATESTPRODUCTS_DATA,
//       payload: latestProductsResponse,
//     });
//   } catch (error) {
//     console.error("Something Went Wrong !!", error);
//   }
// }

// function* fetchFilterData(productId) {
//   const id = productId?.productId;
//   try {
//     const response = yield call(
//       axios.get,
//       `${BaseUrl}${EndPoints.filter}${id}`
//     );
//     const filterDataResponse = response?.data?.data;

//     yield put({
//       type: SET_FILTER_DATA,
//       payload: filterDataResponse,
//     });
//   } catch (error) {
//     console.error("Something Went Wrong !!", error);
//   }
// }

// function* fetchSingleProduct(action) {
//   try {
//     const { productId } = action.payload;

//     const product = yield call(
//       axios.get,
//       `${BaseUrl}${EndPoints.singleproduct}${productId}`
//     );

//     if (product.data.status) {
//       yield put(fetchSingleProductSuccess(product.data.data));
//     } else {
//       // MyToast(product.data.message, "error");
//     }
//   } catch (error) {
//     yield put(fetchSingleProductFailure(error));
//   }
//   // toast.clearWaitingQueue();
// }

// function* fetchProductReviewPermission(action) {
//   const id = parseInt(action.payload.productId.split("=")[1]);
//   const token = action.payload.token
//   try {
//     const product = yield call(
//       axios.get,
//       `${BaseUrl}${EndPoints.product_review_permission}${id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authentication: token
//         },
//       }
//     );
//     if (product.data.status) {
//       yield put({ type: SET_REVIEW_PERMISSION, payload: product.data.status });
//     } else {
//       console.log("error")
//       // MyToast(product.data.message, "error");
//     }
//   } catch (error) {
//     console.log("second error")
//     yield put(fetchSingleProductFailure(error));
//   }
//   // toast.clearWaitingQueue();
// }

// function* handleProductReviews({
//   productID,
//   reviewData,
//   token,
//   setIsLoading,
//   setIsSectionShow,
//   setReviewData,
// }) {
//   try {
//     const reviewDataResponse = yield call(
//       fetch,
//       `${BaseUrl}${EndPoints.productReview}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authentication: token,
//         },
//         body: JSON.stringify({
//           product_id: productID,
//           comment: reviewData?.comment,
//           star_rating: reviewData?.rating,
//         }),
//       }
//     );
//     const response = yield reviewDataResponse.json();
//     if (response?.status) {
//       setIsLoading(false);
//       // MyToast(response?.message, "success");
//       setReviewData([]);
//       yield put({ type: SET_REVIEW_DATA, payload: response });
//       setTimeout(() => {
//         setIsSectionShow(false);
//       }, 1000);
//     } else {
//       setReviewData([]);
//       // MyToast(response?.message, "error");
//       setTimeout(() => {
//         setIsSectionShow(false);
//       }, 1000);
//     }
//     setIsLoading(false);
//   } catch (err) {
//     setIsLoading(false);
//     // MyToast("Something went wrong!", "error");
//     // toast.clearWaitingQueue();
//   }
//   // toast.clearWaitingQueue();
// }

function* fetchCategories() {
  console.log("demo")
}

function* CategorySaga() {
  yield takeEvery("CATEGORIES_REQUEST", fetchCategories);
}

export default CategorySaga;
