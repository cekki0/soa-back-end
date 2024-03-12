package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
)

type Status int

type StringArray []string

const (
	Draft Status = iota
	Published
	Archived
	Ready
)

type Tour struct {
	ID          int    `json:"id"`
	AuthorID    int    `json:"authorId"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (t *Tour) SchemaName() string {
	return "tours"
}

func (a StringArray) Value() (driver.Value, error) {
	return json.Marshal(a)
}

func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = nil
		return nil
	}
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(b, a)
}
