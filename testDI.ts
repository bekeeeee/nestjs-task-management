


interface BuyingItems {
  purchaseBike(quantity:number):void;
  purchaseHelmet(quantity:number):void;
}

interface PaymentProceesor {
  pay(quantity:number):void;
}

function Autobind(_:any,__:string,descriptor:PropertyDescriptor){
  console.log("descriptor",descriptor)
  const originalMethod = descriptor.value;
  const adjDescriptor : PropertyDescriptor = {
    configurable :true,
    enumerable:false,
    get(){
      const boundFn = originalMethod.bind(this);
      return boundFn
    }
  }
  return adjDescriptor
}

class Store implements BuyingItems {

  private static instance: Store;

  bind:string = "hello";
  constructor(private paymentProceesor:PaymentProceesor) {
  }

  purchaseBike(quantity) {
    this.paymentProceesor.pay(200 * quantity );
  }

  purchaseHelmet(quantity) {
    this.paymentProceesor.pay(15 * quantity );
  }
  @Autobind
  logBind(){
    console.log(this.bind)
  }
}

class Stripe {

  constructor(private user:string) {
    // this.user = user;
  }

  makePayment(amountIncents) {
    console.log(
      `${this.user} made payment of $${amountIncents / 100} with Stripe`,
    );
  }
}

class StripePaymentProcessor {
  stripe: Stripe
  constructor(user) {
    this.stripe = new Stripe(user);
  }
  pay(amountInDollars) {
    this.stripe.makePayment(amountInDollars * 100);
  }
}

class PaypalPaymentProcessor {
  paypal: Paypal
    constructor(user) {
      this.paypal = new Paypal(user);
    }
    pay(amountInDollars) {
      this.paypal.makePayment(amountInDollars * 100);
    }
  }

class Paypal {
  constructor(private user:string) {
  }

  makePayment(amountIncents) {
    console.log(
      `${this.user} made payment of $${amountIncents / 100} with Paypal`,
    );
  }
}


const store  = new Store(new PaypalPaymentProcessor("Beke"))
store.purchaseBike(2)
store.purchaseHelmet(2)

function fn(){
  console.log(store.bind)
}
setTimeout(store.logBind,5)


