'use client'
import React from 'react'
import Image from 'next/image'
import Form from "@repo/ui/components/form/index";
import { ProductCard } from "@repo/ui/components/wrapper/productCard/index";

const HomeClient = () => {
  return (
    <div>
      <Form.Search
        appName='web'
        onClick={() => alert('Search button clicked')}
        variant='search'
        isDisabled={false}
        onChange={(e) => console.log('Search input changed:', e.target.value)}
      />
      <Form.Button
        appName='web'
        label='Submit'
        variant='default'
        isDisabled={false}
        onClick={() => alert('Button clicked')}
        icon='search'
      />
      <ProductCard
        appName='web'
        onClick={() => alert('Product card clicked')}
        imageNext={
        <Image src="/test.webp" 
        alt="Product Image" 
        width={300} 
        height={300} 
        className="object-cover rounded-xl" quality={100}
        />}
      />
    </div>
  )
}

export default HomeClient