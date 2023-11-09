import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-help-usermanual',
  templateUrl: './help-usermanual.component.html',
  styleUrls: ['./help-usermanual.component.css']
})
export class HelpUsermanualComponent {
  title = 'test';
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    const scrollToTopButtons = document.querySelectorAll(".scrollToTopButton");

scrollToTopButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scrollToTop();
  });
});

function scrollToTop() {
  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  }
}
