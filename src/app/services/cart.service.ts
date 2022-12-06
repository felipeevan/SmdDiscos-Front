import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CartService {
    private carrinhoObservable = new Subject<any>();
    private carrinhoQuantityObservable = new Subject<any>();

    constructor(private http: HttpClient) {
    }
    

    addItemToCart(id: any, quantity: any){
        let cart: any = localStorage.getItem('cart')
        if(cart==null){
            cart = []
        }else{
            cart = JSON.parse(cart)
        }
        let cartFiltred: any[] = cart
        cartFiltred = cartFiltred.filter((obj: any) =>{
            return obj['id'] == id
        })

        if(cartFiltred.length!=0){
            let cartUpdate: any[] = cart;
            let updateItem: any = cartFiltred[0]
            let updateItemId = cartUpdate.indexOf(updateItem)
            updateItem['q'] = updateItem['q']+quantity;
            cartUpdate[updateItemId] = updateItem
            cart = cartUpdate
        }else{
            cart = [
                ...cart,
                {
                    'id': id,
                    'q': quantity
                }
            ];
        }        
        localStorage.setItem('cart', JSON.stringify(cart))
        this.loadCarrinho();
        this.loadCarrinhoQuantity() 
    }

    clearCart(){
        localStorage.removeItem('cart');
    }

    removeItemFromCart(id: any){
        let cart: any = localStorage.getItem('cart')
        if(cart==null){
            cart = []
        }else{
            cart = JSON.parse(cart)
        }
        let cartFiltred: any[] = cart
        cartFiltred.filter((obj: any) =>{
            return obj['id'] == id
        })
        if(cartFiltred.length!=0){
            let cartUpdate: any[] = cart;
            let updateItem: any = cartFiltred[0]
            let updateItemId = cartUpdate.indexOf(updateItem)
            updateItem['q'] = updateItem['q']-1;
            if(updateItem['q']==0){
                cartUpdate.splice(updateItemId, 1)
            }else{
                cartUpdate[updateItemId] = updateItem
            }
            cart = cartUpdate
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        this.loadCarrinho();
        this.loadCarrinhoQuantity() 
    }

    getCarrinho(): Observable<any>{
        return this.carrinhoObservable.asObservable()
    }

    getCarrinhoQuantity(): Observable<any>{
        return this.carrinhoQuantityObservable.asObservable()
    }

    async loadCarrinho(){
        let carrinho: any[] = []
        let cart: any = localStorage.getItem('cart')
        if(cart==null){
            cart = []
        }else{
            cart = JSON.parse(cart)
        }
        let realCart = cart
        await  cart.forEach((element: any, index: any) => {
            this.http.post(`/smdecommerce/ObterProduto`, {"id": element['id']}).toPromise().then((res: any) =>{
                let data = JSON.parse(res.data);
                data = {
                    ...data,
                    'precototal': data['preco']*element['q'],
                    'quantidade_carrinho': element['q']
                }
                carrinho.push(data)
                realCart[index]=data
            })
        });
        //this.carrinhoObservable.next(carrinho)
        this.loadCarrinhoA(realCart);
    }

    loadCarrinhoA(res:any){
        this.carrinhoObservable.next(res)
    }

    loadCarrinhoQuantity(){
        let cart: any = localStorage.getItem('cart')
        if(cart==null){
            cart = []
        }else{
            cart = JSON.parse(cart)
        }
        
        this.carrinhoQuantityObservable.next(cart.length)
    }


}