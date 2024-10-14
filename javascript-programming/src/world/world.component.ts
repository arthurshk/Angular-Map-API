import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Country {
  id: string;
  iso2Code: string;
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  longitude: number;
  latitude: number; 
}

@Component({
  selector: 'app-world',
  standalone: true,
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css'],
  imports: [CommonModule, HttpClientModule]  
})
export class WorldComponent implements OnInit {
  countryInfo: Country[] = [];
  selectedCountryDetails: Country | null = null; 

  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  async fetchCountryData() {
    try {
      const response = await fetch("http://api.worldbank.org/v2/country?format=json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON, but received ${contentType}`);
      }

      const data = await response.json();
      const countries = data[1];

      this.countryInfo = countries.map((country: any): Country => ({
        id: country.id,
        iso2Code: country.iso2Code,
        name: country.name,
        capitalCity: country.capitalCity,
        region: country.region.value,
        incomeLevel: country.incomeLevel.value,
        longitude: country.longitude,
        latitude: country.latitude
      }));

      this.addEventListeners(); 
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }

  ngOnInit() {
    this.fetchCountryData(); 
    this.loadSVG();  
  }

  loadSVG() {
    this.http.get('assets/world-map.svg', { responseType: 'text' })
      .subscribe(
        svgContent => {
          this.svgContainer.nativeElement.innerHTML = svgContent; 
          this.addEventListeners();  
        },
        error => {
          console.error('Error loading SVG:', error);
        }
      );
  }

  addEventListeners(): void {
    const paths = this.svgContainer.nativeElement.querySelectorAll('path'); 
    
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      path.addEventListener('click', (event: MouseEvent) => {
        const countryCode = path.getAttribute('id'); 
        if (countryCode) {
          this.onCountryClick(countryCode); 
        }
      });
    }
  }

  onCountryClick(countryCode: string): void {
    const country = this.countryInfo.find(c => c.iso2Code.toLowerCase() === countryCode);
    if (country) {
      this.selectedCountryDetails = country; 
      console.log(this.selectedCountryDetails); 
    } else {
      console.error('Country not found:', countryCode);
    }
  }

  onMouseMove(event: MouseEvent): void {
    console.log('Mouse moved over the SVG:', event);
  }

  onMouseLeave(): void {
    console.log('Mouse left the SVG');
  }
}
