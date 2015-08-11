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
        public string Id { get; set; }
        public string Alias { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Cellphone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
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
