import { NestedTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussel sprouts" }]
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }]
      }
    ]
  }
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: "tree-nested-overview-example",
  templateUrl: "tree-nested-overview-example.html",
  styleUrls: ["tree-nested-overview-example.css"]
})
export class TreeNestedOverviewExample {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  getAncestors(array, name) {
    if (typeof array != "undefined") {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return [array[i]];
        }
        const a = this.getAncestors(array[i].children, name);
        if (a !== null) {
          a.unshift(array[i]);
          return a;
        }
      }
    }
    return null;
  }

  onLeafNodeClick(node: FoodNode): void {
    const ancestors = this.getAncestors(this.dataSource.data, node.name);
    console.log("ancestors ", ancestors);

    // this.treeControl.collapse(ancestors[0]);
    console.log("direct parent  ", ancestors[ancestors.length - 2]);
    let breadcrumbs = "";
    ancestors.forEach(ancestor => {
      breadcrumbs += `${ancestor.name}/`;
    });
    console.log("breadcrumbs ", breadcrumbs);
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
