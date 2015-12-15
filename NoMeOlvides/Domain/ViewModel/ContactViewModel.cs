using Domain.DataModel;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.ViewModel
{
    public class ContactViewModel
    {
        private string id;
        public string Id
        {
            get
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    id = string.Empty;
                }

                return id;
            }
            set
            {
                id = value;
            }
        }

        private string alias;
        public string Alias
        {
            get
            {
                if (string.IsNullOrWhiteSpace(alias))
                {
                    alias = string.Empty;
                }

                return alias;
            }
            set
            {
                alias = value;
            }
        }

        private string name;
        public string Name
        {
            get
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    name = string.Empty;
                }

                return name;
            }
            set
            {
                name = value;
            }
        }

        private string surname;
        public string Surname
        {
            get
            {
                if (string.IsNullOrWhiteSpace(surname))
                {
                    surname = string.Empty;
                }

                return surname;
            }
            set
            {
                surname = value;
            }
        }

        private string email;
        public string Email
        {
            get
            {
                if (string.IsNullOrWhiteSpace(email))
                {
                    email = string.Empty;
                }

                return email;
            }
            set
            {
                email = value;
            }
        }

        private string phone;
        public string Phone
        {
            get
            {
                if (string.IsNullOrWhiteSpace(phone))
                {
                    phone = string.Empty;
                }

                return phone;
            }
            set
            {
                phone = value;
            }
        }

        private string cellphone;
        public string Cellphone
        {
            get
            {
                if (string.IsNullOrWhiteSpace(cellphone))
                {
                    cellphone = string.Empty;
                }

                return cellphone;
            }
            set
            {
                cellphone = value;
            }
        }

        private string address;
        public string Address
        {
            get
            {
                if (string.IsNullOrWhiteSpace(address))
                {
                    address = string.Empty;
                }

                return address;
            }
            set
            {
                address = value;
            }
        }

        private string password;
        public string Password
        {
            get
            {
                if (string.IsNullOrWhiteSpace(password))
                {
                    password = string.Empty;
                }

                return password;
            }
            set
            {
                password = value;
            }
        }

        private List<string> contacts;
        public List<string> Contacts
        {
            get
            {
                if (contacts == null)
                {
                    contacts = new List<string>();
                }

                return contacts;
            }
            set { contacts = value; }
        }

        public ContactViewModel() { }
        public ContactViewModel(ContactDataModel contactDataModel)
        {
            this.Id = contactDataModel.Id.ToString();
            this.Alias = contactDataModel.Alias;
            this.Name = contactDataModel.Name;
            this.Surname = contactDataModel.Surname;
            this.Email = contactDataModel.Email;
            this.Phone = contactDataModel.Phone;
            this.Cellphone = contactDataModel.Cellphone;
            this.Address = contactDataModel.Address;
            this.Password = contactDataModel.Password;

            contactDataModel.Contacts.ForEach(o => this.Contacts.Add(o.ToString()));
        }
    }
}
