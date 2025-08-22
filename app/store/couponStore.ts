// store/couponStore.ts

import { create } from 'zustand';

// 우리가 다룰 쿠폰의 타입을 정의 (임시 보상 데이터랑 똑같이)
interface Coupon {
    id: string;
    label: string;
    kind: 'coupon';
}

// 보관함에 어떤 데이터와 기능이 있을지 정의
interface CouponStoreState {
  myCoupons: Coupon[]; // 내가 가진 쿠폰 목록 (배열)
  addCoupon: (coupon: Coupon) => void; // 쿠폰을 목록에 추가하는 기능
}

// 'create' 함수로 공용 보관함(store)을 만들기
export const useCouponStore = create<CouponStoreState>((set) => ({
  myCoupons: [], // 처음엔 내가 가진 쿠폰이 하나도 없으니 빈 배열

    // addCoupon 기능 정의
    // coupon 이라는 이름의 새 쿠폰을 받아서, myCoupons 목록에 추가한다.
    addCoupon: (coupon) => 
    set((state) => ({ myCoupons: [...state.myCoupons, coupon] })),
}));