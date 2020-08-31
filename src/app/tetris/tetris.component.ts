import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS  } from '../../assets/constants';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;
  points: number;
  lines: number;
  level: number;

  constructor() { }

  ngOnInit() {
    this.initBoard();
  }

  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  // play() {
  //   this.board = this.boardService.getEmptyBoard();
  // }

}
