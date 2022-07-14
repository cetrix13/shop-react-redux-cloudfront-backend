interface Product {
  id: string;
  count: number;
  description: string;
  price: number;
  title: string;
  img: string;
}


interface Event {
  pathParameters: {
    productId?: string;
  }
}
