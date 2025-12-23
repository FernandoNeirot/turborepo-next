'use client'
import React from 'react'
import { Form, Wrapper } from '@fernando_neirot2/ui'

const HomeClient = () => {
  return (
    <div className="p-4" style={{maxWidth:"1240px", margin:"0 auto", backgroundColor:"#f3f4f6"}}>
      <Form.Search
        onClick={() => alert('Search button clicked')}
        variant='search'
        isDisabled={false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log('Search input changed:', e.target.value)}
        className=""
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
        <Wrapper.ProductCard
          onClickButtonLeft={() => alert('Product card clicked')}
          onClickButtonRight={() => alert('Product card right button clicked')}
          imageUrl="/test.webp"
          width="full"
          price={199.99}
          title="Sample Product"
          description="This is a sample product description."
          labelButtonLeft="Details"
          iconButtonLeft="view"
          bgButtonLeft="BLUE"
          labelButtonRight="Buy Now"
          iconButtonRight="cart"
          bgButtonRight="GREEN"
          flexDirection="column"
          sizeButton="default"
          height={150}
        />
        <Wrapper.ProductCard
          onClickButtonLeft={() => alert('Product card clicked')}
          onClickButtonRight={() => alert('Product card right button clicked')}
          imageUrl="/test2.webp"
          width="full"
          height={150}
          price={370.99}
          title="Sample Product"
          description="This is a sample product description."
          labelButtonLeft="Details"
          iconButtonLeft="view"
          bgButtonLeft="BLUE"
          labelButtonRight="Buy Now"
          iconButtonRight="cart"
          bgButtonRight="GREEN"
          flexDirection="column"
          sizeButton="default"
        />
        <Wrapper.ProductCard
          onClickButtonLeft={() => alert('Product card clicked')}
          onClickButtonRight={() => alert('Product card right button clicked')}
          imageUrl="/test.webp"
          width="full"
          price={199.99}
          title="Sample Product"
          description="This is a sample product description."
          labelButtonLeft="Details"
          iconButtonLeft="view"
          bgButtonLeft="BLUE"
          labelButtonRight="Buy Now"
          height={150}
          iconButtonRight="cart"
          bgButtonRight="GREEN"
          flexDirection="column"
          sizeButton="default"
        />
      </div>
    </div>
  )
}

export default HomeClient