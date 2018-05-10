import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {ProduitService} from './produit.service';
import {Produit} from '../shared/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

  selectedProduit: Produit = new Produit();

  produits: Produit[];

  produitForm: FormGroup;

  crudOperation: string = 'add';

  constructor(private produitService: ProduitService, private fb: FormBuilder){
    this.createForm();
  }

  createForm(){
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixUnitaire: ''
    });
  }

  ngOnInit(){
    this.loadProduits();
  }

  loadProduits(){
    this.produitService.getProduits().subscribe(
      data => { this.produits = data},
      error => { console.log('an error was occured!')},
      () => { console.log('loading produits was done.')}
    );
  }

  addProduit(){
    this.produitService.addProduit(this.selectedProduit).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  updateProduit(){
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  deleteProduit(){
    this.produitService.deleteProduit(this.selectedProduit.ref).subscribe(
      res => {
        this.selectedProduit = new Produit();
        this.loadProduits();
      }
    )
  }

  initProduit(){
    this.selectedProduit = new Produit();
    this.createForm();
  }
}
