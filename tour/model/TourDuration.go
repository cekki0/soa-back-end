package model

type TransportType int

const (
	Walking TransportType = iota
	Bicycle
	Car
)

type TourDuration struct {
	Duration  int           `json:"Duration"`
	Transport TransportType `json:"Transport"`
}

func NewTourDuration(duration int, transport TransportType) *TourDuration {
	return &TourDuration{
		Duration:  duration,
		Transport: transport,
	}
}

func (td *TourDuration) SetDuration(duration int) {
	td.Duration = duration
}

func (td *TourDuration) SetTransportType(transport TransportType) {
	td.Transport = transport
}
