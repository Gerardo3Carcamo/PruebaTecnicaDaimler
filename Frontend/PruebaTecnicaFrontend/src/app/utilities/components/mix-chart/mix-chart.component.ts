import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-mix-chart',
    templateUrl: './mix-chart.component.html',
    styleUrls: ['./mix-chart.component.scss']
})
export class MixChartComponent implements OnInit, OnChanges {
    stackedData: any;
    colors: any[];
    allLabels: any[];
    allDatasets: any[];

    chartPaginatorOptions: any[] = [5, 10, 20, 50, 100]
    selectedPaginatorSize: any = 20
    chartPaginatorPage: any = 1
    maxChartPaginator: any = 1
    orderIndicator: any = 1
    firstLoad: any = true


    stackedOptions: any;
    @Input() display = true;
    @Input() options;
    @Input() displayLegend = true;
    @Input() lastPage = false;
    @Input() paginator = false;
    @Input() paginatorSizeChange = true;
    @Input() horizontal = false;
    @Input() displayYAxis = true;
    @Input() legendClick = true;
    @Input() height = '400px';
    @Input() valueType;
    @Input() _labels: any[] = [];
    @Input() showTable: any = true;
    @Input() set labels(labels: any[]) {
        this.allLabels = [...labels]
        this._labels = labels

        this.cdr.detectChanges()
    }
    @Input() _datasets: any[] = [];
    @Input() set datasets(datasets: any[]) {
        this.allDatasets = JSON.parse(JSON.stringify(datasets));
        this._datasets = [...datasets];
        this.cdr.detectChanges()
        this.maxChartPaginator = Math.ceil((this._datasets[0].data.length) / this.selectedPaginatorSize)
        if (this.lastPage) {
            this.chartPaginatorPage = this.maxChartPaginator;
        }
        this.ngOnInit();

    }
    @Input() multiaxis = false;
    @Input() stacked = true;
    @Input() showTotal = true;
    @Output() clickCellEvent: EventEmitter<any> = new EventEmitter();
    constructor(private cdr: ChangeDetectorRef) { }
    ngOnChanges(changes: SimpleChanges): void {

        this.cdr.detectChanges()
    }

    ngOnInit(): void {
        this.colors = [];
        const documentStyle = getComputedStyle(document.documentElement);
        let colorsTemp = [
            documentStyle.getPropertyValue('--blue-200'),
            documentStyle.getPropertyValue('--green-200'),
            documentStyle.getPropertyValue('--yellow-200'),
            documentStyle.getPropertyValue('--cyan-200'),
            documentStyle.getPropertyValue('--pink-200'),
            documentStyle.getPropertyValue('--blue-300'),
            documentStyle.getPropertyValue('--green-300'),
            documentStyle.getPropertyValue('--yellow-300'),
            documentStyle.getPropertyValue('--cyan-300'),
            documentStyle.getPropertyValue('--pink-300'),
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--cyan-400'),
            documentStyle.getPropertyValue('--pink-400'),
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500'),
            documentStyle.getPropertyValue('--blue-600'),
            documentStyle.getPropertyValue('--green-600'),
            documentStyle.getPropertyValue('--yellow-600'),
            documentStyle.getPropertyValue('--cyan-600'),
            documentStyle.getPropertyValue('--pink-600'),
            documentStyle.getPropertyValue('--blue-700'),
            documentStyle.getPropertyValue('--green-700'),
            documentStyle.getPropertyValue('--yellow-700'),
            documentStyle.getPropertyValue('--cyan-700'),
            documentStyle.getPropertyValue('--pink-700'),
            documentStyle.getPropertyValue('--blue-800'),
            documentStyle.getPropertyValue('--yellow-800'),
            documentStyle.getPropertyValue('--green-800'),
            documentStyle.getPropertyValue('--cyan-800'),
            documentStyle.getPropertyValue('--pink-800'),
            documentStyle.getPropertyValue('--blue-900'),
            documentStyle.getPropertyValue('--green-900'),
            documentStyle.getPropertyValue('--yellow-900'),
            documentStyle.getPropertyValue('--cyan-900'),
            documentStyle.getPropertyValue('--pink-900'),
        ]

        for (var i = 0; i < this._datasets.length; i++) {
            if (!this._datasets[i].backgroundColor) {

                this._datasets[i].backgroundColor = colorsTemp[i];
            }
        }

        if (this.paginator) {



            let ds = []
            this._datasets.forEach(x => {
                let y = { ...x }
                y.data = []
                ds.push(y)
            })
            let ls = []
            if (this.orderIndicator == 1) {

                for (let i = ((this.chartPaginatorPage - 1) * this.selectedPaginatorSize);
                    i < ((this.chartPaginatorPage - 1) * (this.selectedPaginatorSize)) + this.selectedPaginatorSize && i < this._datasets[0].data.length;
                    i++) {
                    ls.push(this._labels[i])
                    for (let d = 0; d < this._datasets.length; d++) {
                        ds[d].data.push(this._datasets[d].data[i]);
                    }
                }
            } else {
                this._labels.reverse()
                this._datasets.forEach(x => {
                    x.data.reverse()
                })
                for (let i = ((this.chartPaginatorPage - 1) * this.selectedPaginatorSize);
                    i < ((this.chartPaginatorPage - 1) * (this.selectedPaginatorSize)) + this.selectedPaginatorSize && i < this._datasets[0].data.length;
                    i++) {
                    ls.push(this._labels[i])
                    for (let d = 0; d < this._datasets.length; d++) {
                        ds[d].data.push(this._datasets[d].data[i]);
                    }
                }
                this._labels.reverse()
                this._datasets.forEach(x => {
                    x.data.reverse()
                })
            }
            this.stackedData = {
                labels: ls,
                datasets: ds
            };

        } else {
            this.stackedData = {
                labels: this._labels,
                datasets: this._datasets
            };
        }



        this.stackedOptions = this.options ?? {
            indexAxis: this.horizontal ? 'y' : 'x',
            interaction: {
                intersect: true,
                mode: 'index',
            },
            responsive: false,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: this.displayLegend
                },
                tooltip: {
                    filter: function (tooltipItem, data) {
                        // data contains the charts data, make sure you select the right 
                        // value. 
                        //var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        if (tooltipItem.raw === 0) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    callbacks: {

                        label: this.valueType == 'currency' ? function (context) {
                            var label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed._custom) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed._custom.barEnd - context.parsed._custom.barStart);
                            } else if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        } : undefined,
                        footer: this.showTotal ? (this.valueType == 'currency' ? (tooltipItems, data) => {
                            let total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                .format(Math.round(tooltipItems.reduce((a, e) => a + e.raw, 0)));
                            return 'Total: ' + total;
                        } : (tooltipItems, data) => {
                            let total = Math.round(tooltipItems.reduce((a, e) => a + e.raw, 0));
                            return 'Total: ' + total;
                        }) : undefined
                    }
                },
                datalabels: {
                    display: this.display,
                    backgroundColor: function (context) {
                        if (context.dataset.data[context.dataIndex] != 0) {
                            return context.dataset.backgroundColor;
                        } else {
                            return '#00000000'
                        }
                    },
                    borderRadius: 4,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: this.valueType == 'currency' ? function (value, context) {
                        if (value !== null && value !== 0) {
                            if (context.dataset.label != "LDTM" && context.dataset.label != "Dias En Transito") {
                                if (typeof value == 'number') {

                                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                } else {
                                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value[1] - value[0]);
                                }
                            } else {
                                return Math.round((value + Number.EPSILON) * 100) / 100;
                            }
                        } else {
                            return '';
                        }
                    } : function (value, context) {
                        if (value !== null && value !== 0) {
                            return Math.round((value + Number.EPSILON) * 100) / 100;
                        } else {
                            return '';
                        }
                    },
                    padding: 6
                }
            },

            scales: {
                x: {
                    stacked: this.stacked,
                },
                y: {
                    display: this.displayYAxis,
                    stacked: this.stacked
                },
                y1: {
                    type: 'linear',
                    display: this.multiaxis,
                    position: 'right',

                    ticks: {
                        color: 'red'
                    }
                }
            }
        };
        if (!this.legendClick) {
            this.stackedOptions.plugins.legend.onClick = null
        }
    }
    sum(data) {
        return data.reduce((a, b) => a + b, 0);
    }

    clickCell(label, ds) {
        if (this.clickCellEvent) {
            this.clickCellEvent.emit({ label, ds });
        }
    }
    sumByIndex(index) {
        let result = 0;
        this._datasets.forEach(x => {
            result += x.data[index];
        })
        return result;
    }
    sumTotal() {
        let result = 0;
        this._datasets.forEach(x => {
            result += this.sum(x.data);
        })
        return result;
    }

    removeElement(index) {
        this._labels.splice(index, 1);
        this._datasets.forEach(x => {
            x.data.splice(index, 1);
        })
        this.ngOnInit();
    }

    restoreElements() {
        this._labels = this.allLabels
        this._datasets = this.allDatasets
        this.allLabels = JSON.parse(JSON.stringify(this._labels))
        this.allDatasets = JSON.parse(JSON.stringify(this._datasets))
        this.ngOnInit();
    }
    onDataSelect(event) {
        if (this.clickCellEvent) {
            this.clickCellEvent.emit({ label: this.stackedData.labels[event.element.index], ds: this.stackedData.datasets[event.element.datasetIndex].label });
        }
    }

    changeOrder() {
        this.orderIndicator = this.orderIndicator * -1;
        this.ngOnInit();
    }
    changePage(mov) {
        this.chartPaginatorPage += mov;
        this.ngOnInit();
    }
    changePageSize() {
        this.chartPaginatorPage = 1;
        this.maxChartPaginator = Math.ceil((this._datasets[0].data.length) / this.selectedPaginatorSize)
        this.ngOnInit();
    }
}