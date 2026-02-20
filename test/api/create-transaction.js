import midtransClient from 'midtrans-client';

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({message:'Method Not Allowed'});

  const {product, customer} = req.body;

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
  });

  const parameter = {
    transaction_details:{
      order_id: product.id + '-' + Date.now(),
      gross_amount: product.price
    },
    item_details:[
      {id: product.id, price: product.price, quantity:1, name: product.name}
    ],
    customer_details:{
      first_name: customer.name,
      email: customer.email,
      phone: customer.phone
    }
  };

  try{
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({transaction_token: transaction.token});
  } catch(err){
    res.status(500).json({error:err.message});
  }
}